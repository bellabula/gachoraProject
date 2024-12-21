import React, { useState, useCallback } from 'react'

const Item = ({ children }) => <div>{children}</div>

const CAROUSEL_ITEM = 'CAROUSEL_ITEM'
const Carousel = ({ cols = 1, gap = 0, children }) => {
    const [currentPage, setCurrentPage] = useState(0)
    const itemList = React.Children.toArray(children).filter(
        child => child.type.displayName === CAROUSEL_ITEM
    )

    const itemSetList = itemList.reduce((result, item, i) => {
        if (i % cols === 0) {
            result.push([<Item key={i}>{item}</Item>])
        } else {
            result[result.length - 1].push(<Item key={i}>{item}</Item>)
        }

        return result
    }, [])

    const page = Math.ceil(itemList.length / cols)

    const handlePrev = useCallback(() => {
        setCurrentPage(p => p - 1)
    }, [])

    const handleNext = useCallback(() => {
        setCurrentPage(p => p + 1)
    }, [])

    return (
        <div className="Carousel" id='CarouselCss'>
            <div className="Carousel__railWrapper">
                <button
                    className="Carousel__btn--prev"
                    hidden={currentPage <= 0}
                    onClick={handlePrev}>
                    <img src="http://localhost/gachoraProject/public/images/arrowLeft.svg" alt="" />
                </button>
                <div
                    className="Carousel__rail"
                    style={{
                        gridTemplateColumns: `repeat(${page}, 100%)`,
                        left: `calc(${-100 * currentPage}% - ${gap * currentPage}px)`,
                        gridColumnGap: `${gap}px`,
                        width: '100%'
                    }}
                >
                    {itemSetList.map((set, i) => (
                        <div
                            key={i}
                            className="Carousel__ItemSet"
                            style={{
                                display: 'grid',
                                gridTemplateColumns: `repeat(${cols}, 1fr)`,
                                gridGap: `${gap}px`,
                                width: '100%'
                            }}
                        >
                            {set}
                        </div>
                    ))}
                </div>
                <button
                    className="Carousel__btn--next"
                    hidden={currentPage === page - 1}
                    onClick={handleNext}>
                    <img src="http://localhost/gachoraProject/public/images/arrowRight.svg" alt="" />
                </button>
            </div>

        </div>
    )
}

Carousel.Item = ({ children }) => children
Carousel.Item.displayName = CAROUSEL_ITEM
export default Carousel
