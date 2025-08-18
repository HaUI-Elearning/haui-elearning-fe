export const formatCurrency = (amount) => {
    if (amount === 0 || amount === '0') {
        return 'Miễn phí';
    }

    const numericAmount = typeof amount === 'string' ? parseFloat(amount) : amount;

    if (isNaN(numericAmount)) {
        return 'Giá không hợp lệ';
    }

    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    }).format(numericAmount);
};
