import motorengine


class Position(motorengine.Document):
    symbol = motorengine.StringField(max_length=6)
    units = motorengine.IntField(default=0)
    price = motorengine.DecimalField()

    def update(self, units, price):
        if self.units + units < 0:
            raise Exception('Position limit exceeded!')

        if units < 0:
            pnl = units * (price - float(self.price))
            self.units += units
        else:
            pnl = 0
            total_units = self.units + units
            price = (self.units * float(self.price) + units * price) / total_units
            self.price = round(price, 2)
            self.units = total_units

        return pnl

    def serialize(self):
        return {
            'symbol': self.symbol,
            'units': self.units,
            'price': float(self.price),
        }


class Portfolio(motorengine.Document):
    user = motorengine.StringField(max_length=128, required=True)
    cash = motorengine.IntField(default=1000000)
    positions = motorengine.ListField(motorengine.EmbeddedDocumentField(Position))

    async def make_deal(self, sym, units, price):
        if units == 0:
            raise Exception('Amount must be positive!')

        amount = units * price
        if amount > self.cash:
            raise Exception('Cash limit exceeded!')

        pnl = 0
        for position in self.positions:
            if position.symbol == sym:
                pnl = position.update(units, price)
                if position.units == 0:
                    self.positions.remove(position)
                break
        else:
            if units < 0:
                raise Exception('Position limit exceeded!')
            else:
                self.positions.append(Position(symbol=sym, units=units, price=price))

        self.cash -= amount
        # self.cash += pnl
        await self.save()

    async def reset(self):
         self.cash = 1000000
         self.positions = []
         await self.save()

    def serialize(self):
        return {
            # 'user': self.user,
            'cash': self.cash,
            'positions': [p.serialize() for p in self.positions],
        }
