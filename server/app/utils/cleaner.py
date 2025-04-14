from bs4 import BeautifulSoup

def html_to_text(html: str) -> str:
    soup = BeautifulSoup(html, 'html.parser')

    # Remove scripts and styles
    for tag in soup(['script', 'style', 'nav', 'footer', 'header', 'form']):
        tag.decompose()

    # Get only readable text
    text = soup.get_text(separator='\n')

    # Clean up extra whitespace
    lines = [line.strip() for line in text.splitlines()]
    return "\n".join([line for line in lines if line])
