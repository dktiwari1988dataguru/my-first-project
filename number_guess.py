import random

print("=== Number Guessing Game ===")
print("1 se 100 ke beech ek number socho!\n")

secret = random.randint(1, 100)
attempts = 0
max_tries = 7

while attempts < max_tries:
    try:
        guess = int(input(f"Attempt {attempts+1}/{max_tries} - Apna guess daalo: "))
    except ValueError:
        print("Sirf number daalo!\n")
        continue

    attempts += 1

    if guess < secret:
        print("Chhota hai! Aur bada try karo.\n")
    elif guess > secret:
        print("Bada hai! Aur chhota try karo.\n")
    else:
        print(f"Shabash! {attempts} attempts mein sahi jawab diya!")
        print(f"Number tha: {secret}")
        break
else:
    print(f"Game Over! Sahi number tha: {secret}")
