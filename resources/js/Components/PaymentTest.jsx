import React, { useState, useEffect } from 'react';

const PaymentTest = () => {
	const [form, setForm] = useState('');
	const [csrfToken, setCsrfToken] = useState('');

	useEffect(() => {
		// 獲取 CSRF token
		const fetchCsrfToken = async () => {
			const response = await fetch('/csrf-token');
			const data = await response.json();
			setCsrfToken(data.csrfToken);
		};
		fetchCsrfToken();
	}, []);


	// 處理付款
	const handlePayment = async () => {
		try {
			const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

			const response = await fetch('http://localhost/gachoraProject/public/ecpay-payment', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'X-CSRF-TOKEN': csrfToken,
				},
				body: JSON.stringify({ amount: 1000, description: '測試商品' }), // 你可以根據需要修改這些參數
			});

			if (!response.ok) {
				throw new Error('Failed to initiate payment');
			}

			const data = await response.json();
			if (data.error) {
				throw new Error(data.error);
			}

			setForm(data.form);
			document.getElementById('payment-form').innerHTML = data.form;

			// 提交表單並跳轉
			document.forms[0].submit();
		} catch (error) {
			console.error('Payment failed:', error);
		}
	};

	return (
		<div>
			<h1>金流測試</h1>
			<p>這是金流測試頁面。</p>
			<button onClick={handlePayment}>開始付款</button>
			<div id="payment-form" dangerouslySetInnerHTML={{ __html: form }}></div>
		</div>
	);
}

export default PaymentTest;
