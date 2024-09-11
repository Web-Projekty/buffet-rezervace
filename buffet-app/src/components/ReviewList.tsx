import { FaStar } from "react-icons/fa";

type ReviewType = {
  id: number;
  name: string;
  rating: number;
  comment: string;
};

const DummyReviews: ReviewType[] = [
  {
    id: 1,
    name: "John Doe",
    rating: 5,
    comment: "Great product!",
  },
  {
    id: 2,
    name: "Jane Doe",
    rating: 4,
    comment: "Good product!",
  },
  {
    id: 3,
    name: "John Smith",
    rating: 3,
    comment: "Average product!",
  },
  {
    id: 4,
    name: "Jane Smith",
    rating: 2,
    comment: "Bad product!",
  },
  {
    id: 5,
    name: "John Doe",
    rating: 5,
    comment: "Nice product!",
  },
];

const ReviewList = () => {
  const getReviewStars: any = (rating: number) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        i < rating ? (
          <FaStar key={i} />
        ) : (
          <FaStar key={i} className="text-gray-300" />
        ),
      );
    }
    return stars;
  };
  return (
    <div className="text-white">
      {DummyReviews.map((review) => {
        return (
          <div key={review.id}>
            <h3>{review.name}</h3>
            <p className="flex flex-row text-yellow-500">
              {getReviewStars(review.rating)}
            </p>
            <p>{review.comment}</p>
          </div>
        );
      })}
    </div>
  );
};

export default ReviewList;
