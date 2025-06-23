from sqlalchemy.ext.declarative import as_declarative, declared_attr

@as_declarative()
class Base:
    """
    Base class which provides automated table name
    and surrogate primary key column.
    """

    @declared_attr
    def __tablename__(cls) -> str:
        return cls.__name__.lower() + "s" # e.g. User -> users

    # id = Column(Integer, primary_key=True, index=True) # Standard primary key, if not defined in model
    # However, we define specific PKs in our models, so this generic one might not be needed here
    # if all models explicitly define their primary keys.
    # For this project, models.py defines 'id' in each class, so this can be kept minimal.
    pass
