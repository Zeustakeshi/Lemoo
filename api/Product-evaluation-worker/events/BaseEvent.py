import inflection


class BaseEvent:
    def to_dict(self):
        result = {}
        for key, value in self.__dict__.items():
            camel_case_key = inflection.camelize(key, uppercase_first_letter=False)
            result[camel_case_key] = value
        return result
