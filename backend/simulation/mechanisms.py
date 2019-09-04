def incentive_linear(diff, coef):
    earn = diff * coef
    return earn


def incentive_power(diff, coef, power):
    earn = (diff ** power) * coef
    return earn


def incentive_exp(diff, coef, exp):
    earn = (exp ** diff) * coef
    return earn


def custom(diff, coef, exp):
    earn = (exp ** (diff + 2)) * coef
    return earn
