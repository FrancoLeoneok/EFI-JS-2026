import { useOutletContext } from "react-router-dom"

export default function ProductsReviews() {
  const context = useOutletContext()
  const product = context?.product ?? context
  const reviews = product?.reviews ?? []

  return (
    <div className="flex flex-col gap-4">
      {reviews.length > 0 ? (
        reviews.map((review, key) => (
          <article
            key={key}
            className="flex flex-col rounded-2xl border border-stone-200 bg-white p-5 shadow-xs transition-shadow hover:shadow-sm"
          >
            <div className="flex items-center justify-between gap-3 border-b border-stone-100 pb-3">
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-stone-100 border border-stone-200 text-xs font-bold text-[#2e5134]">
                  {review.reviewerName ? review.reviewerName.charAt(0).toUpperCase() : 'U'}
                </span>
                <p className="text-sm font-semibold text-stone-900">
                  {review.reviewerName}
                </p>
              </div>

              <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-2.5 py-1 border border-amber-200/70 text-xs font-bold text-amber-900">
                <span>{review.rating}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  fill="currentColor"
                  className="text-amber-500"
                  viewBox="0 0 16 16"
                  aria-hidden="true"
                >
                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                </svg>
              </div>
            </div>

            <p className="pt-3 text-sm leading-relaxed text-stone-600">
              {review.comment}
            </p>
          </article>
        ))
      ) : (
        <p className="rounded-2xl border border-stone-200 bg-white p-6 text-center text-sm text-stone-500">
          No hay opiniones disponibles para este producto.
        </p>
      )}
    </div>
  )
}
