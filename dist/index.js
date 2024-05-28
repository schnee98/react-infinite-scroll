const FIRST_ELEMENT = 0;
const THRESHOLD_NUMBER = 0.01;
const useInfiniteScroll = (callback) => {
    const observer = new IntersectionObserver((entries) => {
        const entry = entries[FIRST_ELEMENT];
        if (entry && entry.isIntersecting) {
            callback();
            observer.unobserve(entry.target);
        }
    }, { threshold: THRESHOLD_NUMBER });
    return { observe: (element) => observer.observe(element) };
};
export default useInfiniteScroll;
