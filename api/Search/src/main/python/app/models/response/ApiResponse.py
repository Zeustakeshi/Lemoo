from datetime import datetime
from typing import Generic, TypeVar, Any

import pytz
from pydantic import BaseModel

T = TypeVar('T')


class ApiResponse(BaseModel, Generic[T]):
    is_success: bool
    data: T | None = None
    errors: Any | None = None
    timestamp: str

    class Config:
        exclude_none = True
        alias_generator = lambda x: x.replace('_', '')
        allow_population_by_field_name = True
        json_encoders = {
            datetime: lambda v: v.isoformat()
        }

    @staticmethod
    def success(data: T) -> 'ApiResponse[T]':
        return ApiResponse(
            is_success=True,
            data=data,
            timestamp=datetime.now(pytz.UTC).isoformat()
        )

    @staticmethod
    def error(errors: Any) -> 'ApiResponse[None]':
        return ApiResponse(
            is_success=False,
            errors=errors,
            timestamp=datetime.now(pytz.UTC).isoformat()
        )
