import { useRouter } from "next/router";
import ErrorMessage from "@components/ui/error-message";
import NotFound from "@components/common/not-found";
import SwiperCore, { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import cn from "classnames";
import { ArrowNextIcon } from "@components/icons/arrow-next";
import { ArrowPrevIcon } from "@components/icons/arrow-prev";
import { useCategoriesQuery } from "@data/category/use-categories.query";
import BakeryCategoryLoader from "@components/ui/loaders/bakery-category-loader";

SwiperCore.use([Navigation]);
 // Branch Admin 
const BakeryCategory = () => {
  const router = useRouter();

  const { data, isLoading: loading, error } = useCategoriesQuery({
    type: "home",
  });

  if (loading) {
    return (
      <div className="hidden xl:block">
        <div className="w-full h-52 flex justify-center mt-8 px-2">
          <BakeryCategoryLoader />
        </div>
      </div>
    );
  }
  if (error) return <ErrorMessage message={error.message} />;

  const { pathname, query } = router;
  const selectedQueries = query.category;

  const onCategoryClick = (slug: string) => {
    if (selectedQueries === slug) {
      const { category, ...rest } = query;
      router.push(
        {
          pathname,
          query: { ...rest },
        },
        {
          pathname,
          query: { ...rest },
        },
        {
          scroll: false,
        }
      );
      return;
    }
    router.push(
      {
        pathname,
        query: { ...query, category: slug },
      },
      {
        pathname,
        query: { ...query, category: slug },
      },
      {
        scroll: false,
      }
    );
  };

  const breakpoints = {
    320: {
      slidesPerView: 2,
    },

    440: {
      slidesPerView: 3,
    },

    620: {
      slidesPerView: 4,
    },

    820: {
      slidesPerView: 5,
    },

    1100: {
      slidesPerView: 5,
    },

    1280: {
      slidesPerView: 5,
    },
  };

  return (
    <div className="w-full px-0">
      {data?.categories?.data?.length ? (

          <div className="relative w-full px-5">
            <Swiper
              id="category-card-menu"
              navigation={{
                nextEl: ".banner-slider-next",
                prevEl: ".banner-slider-prev",
              }}
              className="w-full px-5"
              style={{height:"42px",width:"100% !important",paddingTop:"0px"}}
              breakpoints={breakpoints}
              slidesPerView={5}
              spaceBetween={10}
            >
              {data?.categories?.data.map((category, idx) => (
                <SwiperSlide key={idx} className="w-full ">
                    <a href={`#${category.slug}`} 
                      className={cn(
                        "w-full  py-2 inline-block text-sm first-word border-gray-100 bg-white rounded-full text-heading dark:border-neutral-300 uppercase text-center ",
                        location.hash == '#'+category.slug ? "dark:text-white dark:bg-primary" : "dark:text-white dark:bg-primary"
                      )}>
                        {category.name?.replace(/ .*/,'')}
                    </a>
                </SwiperSlide>
              ))}
            </Swiper>
            <button className="banner-slider-prev w-8 h-8 flex items-center justify-center text-heading bg-white shadow-300 outline-none rounded-full absolute top-1/2 -mt-4 z-10 cursor-pointer -left-4 focus:outline-none">
              <ArrowPrevIcon />
            </button>
            <button className="banner-slider-next w-8 h-8 flex items-center justify-center text-heading bg-white shadow-300 outline-none rounded-full absolute top-1/2 -mt-4 z-10 cursor-pointer -right-4 focus:outline-none">
              <ArrowNextIcon />
            </button>
          </div>

      ) : (
        <div className="min-h-full pt-6 pb-8 px-4 lg:p-8">
          <NotFound text="Nenhuma categoria encontrada :(" className="h-96" />
        </div>
      )}
    </div>
  );
};

export default BakeryCategory;
