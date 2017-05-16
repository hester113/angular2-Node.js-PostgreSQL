"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = require("./common");
var user_1 = require("./user");
var price_1 = require("./price");
var PaymentType = (function () {
    function PaymentType(value) {
        if (value === void 0) { value = {}; }
        this.id = String(value.id || '');
        this.title = new common_1.MLString(value.title);
        this.icon = String(value.icon || '');
    }
    PaymentType.getPaymentType = function (id) {
        if (id === void 0) { id = ''; }
        return PaymentType.List.find(function (value) { return value.id === id; }) || PaymentType.List[0];
    };
    return PaymentType;
}());
PaymentType.List = [
    new PaymentType({
        id: 'card',
        title: new common_1.MLString({
            en: 'Card',
            ar: 'بطاقة ائتمان'
        }),
        icon: null
    }),
    new PaymentType({
        id: 'bank',
        title: new common_1.MLString({
            en: 'Bank transfer',
            ar: 'التحويل البنكي'
        }),
        icon: null
    }),
    new PaymentType({
        id: 'wu',
        title: new common_1.MLString({
            en: 'Western Union',
            ar: 'حوالة ويسترن يونيون'
        }),
        icon: null
    })
];
exports.PaymentType = PaymentType;
var OrderStatus = (function () {
    function OrderStatus(value) {
        if (value === void 0) { value = {}; }
        this.id = String(value.id || '');
        this.title = new common_1.MLString(value.title);
        this.icon = String(value.icon || '');
    }
    OrderStatus.getOrderStatus = function (id) {
        if (id === void 0) { id = ''; }
        return OrderStatus.List.find(function (value) { return value.id === id; }) || OrderStatus.List[0];
    };
    return OrderStatus;
}());
OrderStatus.List = [
    new OrderStatus({
        id: 'new',
        title: new common_1.MLString({
            en: 'New order',
            ar: 'طلب جديد'
        }),
        icon: null
    }),
    new OrderStatus({
        id: 'processing',
        title: new common_1.MLString({
            en: 'Under processing',
            ar: 'تحت التجهيز'
        }),
        icon: null
    }),
    new OrderStatus({
        id: 'need-payment-confirm',
        title: new common_1.MLString({
            en: 'Need payment confirm',
            ar: 'تحتاج تأكيد الدفع'
        }),
        icon: null
    }),
    new OrderStatus({
        id: 'confirmed',
        title: new common_1.MLString({
            en: 'Confirmed',
            ar: 'مؤكد'
        }),
        icon: null
    }),
    new OrderStatus({
        id: 'not-approved',
        title: new common_1.MLString({
            en: 'Not approved',
            ar: 'غير مقبول'
        }),
        icon: null
    }),
    new OrderStatus({
        id: 'cancellation',
        title: new common_1.MLString({
            en: 'Cancellation',
            ar: 'إلغاء'
        }),
        icon: null
    }),
    new OrderStatus({
        id: 'canceled',
        title: new common_1.MLString({
            en: 'Canceled',
            ar: 'ألغيت'
        }),
        icon: null
    })
];
exports.OrderStatus = OrderStatus;
var cardRx = {
    electron: /^(4026|417500|4405|4508|4844|4913|4917)\d+$/,
    maestro: /^(5018|5020|5038|5612|5893|6304|6759|6761|6762|6763|0604|6390)\d+$/,
    dankort: /^(5019)\d+$/,
    interpayment: /^(636)\d+$/,
    unionpay: /^(62|88)\d+$/,
    visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
    mastercard: /^5[1-5][0-9]{14}$/,
    amex: /^3[47][0-9]{13}$/,
    diners: /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/,
    discover: /^6(?:011|5[0-9]{2})[0-9]{12}$/,
    jcb: /^(?:2131|1800|35\d{3})\d{11}$/
};
var Card = (function () {
    function Card(value) {
        if (value === void 0) { value = {}; }
        this.number = String(value.number || '');
        this.cardholder = String(value.cardholder || '');
        var month = Number.parseInt(value.validMonth || 0);
        this.validMonth = month > 0 && month <= 12 && month || 1;
        var year = Number.parseInt(value.validYear || 0);
        this.validYear = year > 2000 && year || new Date().getFullYear();
        this.cvv = String(value.cvv || '');
    }
    Card.prototype.toObject = function () {
        return {
            number: this.number,
            cardholder: this.cardholder,
            validMonth: this.validMonth,
            validYear: this.validYear,
            cvv: this.cvv
        };
    };
    Object.defineProperty(Card.prototype, "type", {
        get: function () {
            var number = this.number.replace(/[^0-9]+/, '');
            if (!number)
                return null;
            for (var key in cardRx)
                if (cardRx[key].test(number))
                    return key;
            return null;
        },
        enumerable: true,
        configurable: true
    });
    return Card;
}());
exports.Card = Card;
var OrderType = (function () {
    function OrderType(value) {
        if (value === void 0) { value = {}; }
        this.id = String(value.id || '');
        this.title = new common_1.MLString(value.title);
        this.icon = String(value.icon || '');
    }
    OrderType.getOrderType = function (id) {
        if (id === void 0) { id = ''; }
        return OrderType.List.find(function (value) { return value.id === id; }) || OrderType.List[0];
    };
    return OrderType;
}());
OrderType.List = [
    new OrderType({
        id: 'trip',
        title: new common_1.MLString({
            en: 'Trip',
            ar: 'رحلة قصيرة'
        }),
        icon: 'uk-icon-anchor'
    }),
    new OrderType({
        id: 'package',
        title: new common_1.MLString({
            en: 'Package',
            ar: 'صفقة'
        }),
        icon: 'uk-icon-suitcase'
    })
];
exports.OrderType = OrderType;
var Order = (function (_super) {
    __extends(Order, _super);
    function Order(value) {
        if (value === void 0) { value = {}; }
        var _this = _super.call(this, value) || this;
        _this.owner = null;
        _this.type = OrderType.getOrderType(value.type || null);
        _this.hrid = Number.parseInt(value.hrid || 0) || 0;
        _this.description = String(value.description || '');
        if (value.owner && value.owner.id)
            _this.owner = new user_1.User(value.owner);
        _this.date = value.date ? new Date(value.date) : new Date();
        if (Number.isNaN(_this.date.getTime()))
            _this.date = new Date();
        _this.departureDate = common_1.newDate(value.departureDate) || common_1.newDate();
        _this.returnDate = common_1.newDate(value.returnDate) || common_1.newDate();
        _this.price = value.price ? (value.price instanceof price_1.Price ? value.price : new price_1.Price(value.price)) : null;
        _this.paymentType = PaymentType.getPaymentType(value.paymentType || null);
        _this.card = new Card(value.card || {});
        _this.status = OrderStatus.getOrderStatus(value.status || null);
        _this.processingFee = Math.max(0, Number.parseFloat(value.processingFee || 0) || 0);
        _this.exchangeRate = Math.max(0, Number.parseFloat(value.exchangeRate || 0) || 0);
        _this.egyptianMarkUp = Math.max(0, Number.parseFloat(value.egyptianMarkUp || 0) || 0);
        return _this;
    }
    Order.prototype.toObject = function () {
        return Object.assign({}, _super.prototype.toObject.call(this), {
            type: this.type.id,
            hrid: this.hrid,
            description: this.description,
            owner: this.owner && this.owner.id.uuid || null,
            date: this.date,
            departureDate: this.departureDate,
            returnDate: this.returnDate,
            price: this.price && this.price.toObject() || null,
            paymentType: this.paymentType.id,
            card: this.card.toObject(),
            status: this.status.id,
            processingFee: this.processingFee,
            exchangeRate: this.exchangeRate,
            egyptianMarkUp: this.egyptianMarkUp
        });
    };
    return Order;
}(common_1.Model));
Order.__api = 'objects/order';
exports.Order = Order;
//# sourceMappingURL=order.js.map