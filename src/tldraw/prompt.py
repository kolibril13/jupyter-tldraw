import requests


def sent_request_to_openai(prompt, base64_image, api_key):
    # this code is based on https://platform.openai.com/docs/guides/vision/uploading-base-64-encoded-images
    headers = {"Content-Type": "application/json", "Authorization": f"Bearer {api_key}"}

    payload = {
        "model": "gpt-4o",
        "messages": [
            {
                "role": "user",
                "content": [
                    {"type": "text", "text": prompt},
                    {
                        "type": "image_url",
                        "image_url": {"url": f"data:image/jpeg;base64,{base64_image}"},
                    },
                ],
            }
        ],
        "max_tokens": 4096,
    }

    response = requests.post(
        "https://api.openai.com/v1/chat/completions", headers=headers, json=payload
    )

    r = response.json()
    print(r)
    text_response = r["choices"][0]["message"]["content"]

    import re

    # Regular expression to find the block of text
    pattern = r"```python(.*?)```"
    match = re.search(pattern, text_response, re.DOTALL)

    if match:
        code_inside = match.group(
            1
        ).strip()  # .strip() to remove leading/trailing whitespace
        # print(code_inside)
    else:
        print("No code block found")
    # print(code_inside)
    return code_inside
