from langchain_core.prompts import ChatPromptTemplate
from langchain_google_genai import ChatGoogleGenerativeAI
import json
import re
# Khởi tạo LLM
llm = ChatGoogleGenerativeAI(model="gemini-2.0-flash")

prompt_template = ChatPromptTemplate.from_template("""
Bạn là một chuyên gia thẩm định nội dung sản phẩm cho sàn thương mại điện tử. 
Nhiệm vụ của bạn là đánh giá chất lượng nội dung và tính thu hút của sản phẩm dựa trên các tiêu chí sau. 
Hãy tập trung đánh điểm số dựa vào sự hợp lý của sản phẩm
Hãy tập trung vào việc giải thích lý do cho điểm số của bạn trong phần "note".

### Thông tin sản phẩm:
- Tên sản phẩm: {name}
- Mô tả sản phẩm: {description}
- Danh mục: {categories}
- SKU (Stock Keeping Unit): {skus}

Tiêu chí đánh giá:
1. Tên sản phẩm và tên SKU:
   - Tên có rõ ràng, dễ hiểu và hấp dẫn không?
   - Có thể thu hút người mua ngay từ cái nhìn đầu tiên không?

2. Mô tả sản phẩm:
   - Mô tả có đầy đủ thông tin chi tiết không? (Ví dụ: công dụng, tính năng nổi bật, hướng dẫn sử dụng...)
   - Nội dung có chính xác và không gây hiểu nhầm không?
   - Ngôn ngữ có mạch lạc, dễ đọc và hấp dẫn không?

3. Danh mục sản phẩm:
   - Sản phẩm được phân loại vào danh mục có hợp lý không?
   - Danh mục có phù hợp với đặc điểm và mục đích sử dụng của sản phẩm không?

4. Giá SKU:
   - Giá cả có hợp lý so với thị trường và chất lượng sản phẩm không?
   - Có sự chênh lệch bất thường giữa các SKU không?

5. Thông tin đóng gói:
   - Kích thước và trọng lượng đóng gói có hợp lý không?
   - Có đảm bảo an toàn trong quá trình vận chuyển không?

6. Số tồn kho:
   - Số lượng tồn kho có đủ để đáp ứng nhu cầu khách hàng không?
   - Có sự chênh lệch bất thường giữa các SKU không?

7. Biến thể SKU:
   - Các biến thể (ví dụ: màu sắc, kích thước) có đúng và đầy đủ không?
   - Có trùng lặp hoặc thiếu sót biến thể nào không?

Yêu cầu trả về:
Hãy đánh giá sản phẩm theo thang điểm từ 0 đến 100, trong đó:
- 0-30: Chất lượng kém, cần cải thiện nhiều.
- 31-60: Chất lượng trung bình, cần cải thiện một số điểm.
- 61-80: Chất lượng tốt, chỉ cần điều chỉnh nhỏ.
- 81-100: Chất lượng xuất sắc, không cần cải thiện.

Trả về kết quả dưới dạng JSON hợp lệ, không có bất kỳ ký tự thừa hoặc định dạng Markdown nào (ví dụ: không dùng ```json, ``` hoặc \n). Đảm bảo chuỗi JSON có thể được phân tích cú pháp trực tiếp bằng json.loads() trong Python.

Định dạng JSON bắt buộc:
{{
  "score": <điểm số>,
  "note": "<lý do>"
}}
""")


evaluation_chain = prompt_template | llm

def evaluation (product_data):
    try:
        result = evaluation_chain.invoke(product_data)
        result_content = result.content

        # Sử dụng regex để trích xuất JSON từ Markdown
        json_pattern = r'```json\n(.*?)\n```'
        match = re.search(json_pattern, result_content, re.DOTALL)
        if match:
            json_str = match.group(1)  # Lấy phần JSON bên trong ```json```
        else:
            json_str = result_content  # Nếu không có Markdown, dùng nguyên chuỗi

        # Phân tích cú pháp JSON
        result_json = json.loads(json_str)
        return result_json
    except json.JSONDecodeError:
        return {"error": "Kết quả từ LLM không phải JSON hợp lệ."}
    except Exception as e:
        return {"error": f"Lỗi không xác định: {str(e)}"}

