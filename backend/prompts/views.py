import json
import redis
import jwt
import datetime
from django.conf import settings
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate
from .models import Prompt

redis_client = redis.Redis(host="redis", port=6379, db=0, decode_responses=True)


# --- JWT Helper Function ---
def require_jwt(view_func):
    def wrapper(request, *args, **kwargs):
        auth_header = request.headers.get("Authorization")
        if not auth_header or not auth_header.startswith("Bearer "):
            return JsonResponse({"error": "Unauthorized. Please log in."}, status=401)

        token = auth_header.split(" ")[1]
        try:
            # Decode token using Django's secret key
            jwt.decode(token, settings.SECRET_KEY, algorithms=["HS256"])
        except jwt.ExpiredSignatureError:
            return JsonResponse(
                {"error": "Token expired. Please log in again."}, status=401
            )
        except jwt.InvalidTokenError:
            return JsonResponse({"error": "Invalid token."}, status=401)

        return view_func(request, *args, **kwargs)

    return wrapper


# --- Login Endpoint ---
@csrf_exempt
def login_view(request):
    if request.method == "POST":
        data = json.loads(request.body)
        username = data.get("username")
        password = data.get("password")

        user = authenticate(username=username, password=password)
        if user is not None:
            # Generate JWT valid for 24 hours
            payload = {
                "user_id": user.id,
                "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=24),
            }
            token = jwt.encode(payload, settings.SECRET_KEY, algorithm="HS256")
            return JsonResponse({"token": token})
        else:
            return JsonResponse({"error": "Invalid credentials"}, status=400)
    return JsonResponse({"error": "Method not allowed"}, status=405)


# --- Core Endpoints ---
@csrf_exempt
def prompt_list_create(request):
    if request.method == "GET":
        prompts = list(Prompt.objects.values("id", "title", "complexity", "created_at"))
        return JsonResponse(prompts, safe=False)

    elif request.method == "POST":
        # Protect this specific logic manually since we combined GET and POST
        return create_prompt(request)


@require_jwt
def create_prompt(request):
    try:
        data = json.loads(request.body)
        title = data.get("title", "").strip()
        content = data.get("content", "").strip()
        complexity = data.get("complexity")

        if len(title) < 3:
            return JsonResponse({"error": "Title too short"}, status=400)
        if len(content) < 20:
            return JsonResponse({"error": "Content too short"}, status=400)

        prompt = Prompt.objects.create(
            title=title, content=content, complexity=complexity
        )
        return JsonResponse({"id": str(prompt.id), "title": prompt.title}, status=201)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=400)


@csrf_exempt
def prompt_detail(request, pk):
    if request.method == "GET":
        try:
            prompt = Prompt.objects.get(pk=pk)

            # --- The Graceful Redis Fallback ---
            try:
                redis_key = f"prompt:{prompt.id}:views"
                view_count = redis_client.incr(redis_key)
            except redis.exceptions.ConnectionError:
                # If Redis is unreachable (like on Render free tier), don't crash.
                view_count = "Offline"

            data = {
                "id": str(prompt.id),
                "title": prompt.title,
                "content": prompt.content,
                "complexity": prompt.complexity,
                "created_at": prompt.created_at,
                "view_count": view_count,
            }
            return JsonResponse(data)
        except Prompt.DoesNotExist:
            return JsonResponse({"error": "Not found"}, status=404)
