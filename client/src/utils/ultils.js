import { FaStar, FaRegStar } from 'react-icons/fa';

export const renderStars = (rating) => {
	return [...Array(5)].map((_, index) =>
		index < rating ? (
			<FaStar key={index} className='text-warning' />
		) : (
			<FaRegStar key={index} className='text-secondary' />
		)
	);
};
// Hàm chuyển đổi timestamp sang giờ Việt Nam
export const formatVietnamDateTime = (timestamp) => {
	const date = new Date(Number(timestamp)); // Chuyển chuỗi timestamp thành số
	const vietnamTime = new Date(date.getTime() + 7 * 60 * 60 * 1000); // Thêm 7 giờ (UTC+7)
	return vietnamTime.toLocaleString('vi-VN', {
		year: 'numeric',
		month: '2-digit',
		day: '2-digit',
		hour: '2-digit',
		minute: '2-digit',
		second: '2-digit',
	});
};
