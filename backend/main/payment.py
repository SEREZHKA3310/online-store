class SBPPayment:
    def pay(self, amount):
        return f"Оплата {amount} руб через СБП"


class CardPayment:
    def make_payment(self, amount):
        return f"Оплата {amount} руб картой"


class CashPayment:
    def give_cash(self, amount):
        return f"Оплата {amount} руб наличными"


class PaymentAdapter:
    def __init__(self, payment_obj, method_name):
        self.payment_obj = payment_obj
        self.method_name = method_name

    def pay(self, amount):
        method = getattr(self.payment_obj, self.method_name)
        return method(amount)