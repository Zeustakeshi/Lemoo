from fastapi import FastAPI

from .api.v1 import search_router

app = FastAPI()

app.include_router(search_router.router)

if __name__ == '__main__':
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
