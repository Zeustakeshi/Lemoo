from mcp.server import FastMCP
import os
mcp = FastMCP(name="my-first-mcp-server")

@mcp.tool()
def get_user_project_name ():
    """Lấy tên dự án hiện tại của người dùng"""
    return "Lemoo project"


@mcp.tool()
def create_dir(path: str, name: str) -> bool:
    """
    Hàm tạo thư mục.

    Args:
        path (str): Đường dẫn đến thư mục cha.
        name (str): Tên của thư mục cần tạo.

    Returns:
        bool: True nếu tạo thư mục thành công hoặc thư mục đã tồn tại, False nếu thất bại.

    Raises:
        OSError: Nếu có lỗi khi tạo thư mục (ví dụ: quyền truy cập, đường dẫn không hợp lệ).
    """
    try:
        # Tạo đường dẫn đầy đủ
        full_path = os.path.join(path, name)

        # Kiểm tra xem thư mục đã tồn tại chưa
        if not os.path.exists(full_path):
            os.mkdir(full_path)
            return True
        else:
            # Thư mục đã tồn tại
            return True
    except OSError as e:
        print(f"Lỗi khi tạo thư mục {full_path}: {e}")
        return False


if __name__ == '__main__':
    mcp.run("stdio")
