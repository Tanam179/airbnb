import { NextResponse } from "next/server"

export const GET = async function() {
    try {
        const res = await fetch(`https://www.airbnb.com.vn/api/v2/autocompletes-personalized?locale=vi&currency=VND&country=VN&key=d306zoyjsyarp7ifhu67rjxn52tv0t20&language=vi&locale=vi&num_results=5&user_input=Đà&api_version=1.2.0&satori_config_token=EhIiQjIVAhIyEhIyEiISEiJSQjXCAxWIARU6Co4BBQA&vertical_refinement=homes&region=-1&options=should_filter_by_vertical_refinement%7Chide_nav_results%7Cshould_show_stays%7Csimple_search%7Cflex_destinations_june_2021_launch_web_treatment`);
        const data = await res.json();
        return NextResponse.json({ status: 'succes', data }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ status: 'Unsuccessful', message: error.message }, { status: 500 })
    }

}