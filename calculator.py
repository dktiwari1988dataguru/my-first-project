def add(a, b):
    return a + b

def subtract(a, b):
    return a - b

def multiply(a, b):
    return a * b

def divide(a, b):
    if b == 0:
        return "Error: Division by zero"
    return a / b

print("=== Simple Calculator ===")
print("1. Add")
print("2. Subtract")
print("3. Multiply")
print("4. Divide")

choice = input("\nEnter choice (1/2/3/4): ")
a = float(input("Enter 1st number: "))
b = float(input("Enter 2nd number: "))

if choice == '1':
    print(f"Result: {add(a, b)}")
elif choice == '2':
    print(f"Result: {subtract(a, b)}")
elif choice == '3':
    print(f"Result: {multiply(a, b)}")
elif choice == '4':
    print(f"Result: {divide(a, b)}")
else:
    print("Invalid choice!")
