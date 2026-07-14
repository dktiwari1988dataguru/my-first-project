import json
import os

FILE = "tasks.json"

def load():
    if os.path.exists(FILE):
        with open(FILE) as f:
            return json.load(f)
    return []

def save(tasks):
    with open(FILE, "w") as f:
        json.dump(tasks, f)

def show(tasks):
    if not tasks:
        print("  (koi task nahi hai)\n")
        return
    for i, t in enumerate(tasks, 1):
        status = "✅" if t["done"] else "⬜"
        print(f"  {i}. {status} {t['task']}")
    print()

tasks = load()

while True:
    print("=== To-Do List ===")
    show(tasks)
    print("1. Naya task add karo")
    print("2. Task complete karo")
    print("3. Task delete karo")
    print("4. Bahar jao")

    choice = input("\nChoice daalo (1-4): ").strip()

    if choice == "1":
        task = input("Naya task: ").strip()
        if task:
            tasks.append({"task": task, "done": False})
            save(tasks)
            print("Task add ho gaya!\n")

    elif choice == "2":
        show(tasks)
        try:
            n = int(input("Konsa task complete hua? (number daalo): ")) - 1
            if 0 <= n < len(tasks):
                tasks[n]["done"] = True
                save(tasks)
                print("Task complete!\n")
        except ValueError:
            print("Sahi number daalo!\n")

    elif choice == "3":
        show(tasks)
        try:
            n = int(input("Konsa task delete karna hai? (number daalo): ")) - 1
            if 0 <= n < len(tasks):
                removed = tasks.pop(n)
                save(tasks)
                print(f"'{removed['task']}' delete ho gaya!\n")
        except ValueError:
            print("Sahi number daalo!\n")

    elif choice == "4":
        print("Alvida!")
        break
    else:
        print("1, 2, 3 ya 4 daalo!\n")
