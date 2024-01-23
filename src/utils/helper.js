export function getDisplayDate(date){

    const Months = ["January","February","March","April","May","June","July","August","September","October","November","December"];

    const d = new Date(date);
    const day = d.getUTCDate();
    const month = Months[d.getUTCMonth()]
    const year = d.getUTCFullYear();

    return `${day} ${month} ${year}`

}