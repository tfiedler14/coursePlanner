import React from 'react';
import './App.css';
import DayArea from './DayArea';
import CardDeck from 'react-bootstrap/CardDeck';

//this is where a preconfigured schedule creates display of schedule


class PlanArea extends React.Component {

    delegateDays() {
        let ret = [];
        let week = {
            mon: [],
            tue: [],
            wed: [],
            thur: [],
            fri: [],
        };

        let scheduleOptions = this.props.coursePlans;
        let scheduleOpt;
        if (this.props.coursePlans.length !== 0) {
            scheduleOpt = scheduleOptions[0][0];
            
            let beg = '';
            let fin = '';
            let dec1 = 0;
            let dec2 = 0;
            let window = '';

            Object.values(scheduleOpt).forEach((course) => {

                console.log("course", course);

                //make class card coverthingy for section and subsection now.
                //section and subsection are the only two that need to be evaluated. 
                //can be done the exact same way
                for (let i = 1; i < course.length; i++) {
                    //go through each array element

                    //get to time 
                    Object.entries(course[i][1].time).forEach(dayEntry => {

                        console.log("day entry", dayEntry);

                        let currDay = dayEntry[0];
                        let timeStamp = dayEntry[1];

                        beg = timeStamp.substr(0, timeStamp.indexOf(' ') - 2);
                        let milCheck1 = (timeStamp.substr(0, timeStamp.indexOf(' ')).includes("pm"));
                        fin = timeStamp.substr(timeStamp.indexOf('-') + 2, timeStamp.length - 2);
                        let milCheck2 = (fin.includes("pm"));
                        fin = fin.substr(0, fin.length - 2);
                        //now in format of xx:xxzm
                        //convert to military and decimal
                        dec1 = parseInt(beg.substr(beg.indexOf(':') + 1), 10);
                        beg = parseInt(beg.substring(0, beg.indexOf(':')), 10);
                        console.log(dec1);
                        if (milCheck1 && beg !== 12) {
                            beg += 12;
                        }
                        if (dec1 !== 0) {
                            dec1 = (dec1 / 60);
                            beg += dec1;
                        }

                        dec2 = parseInt(fin.substr(fin.indexOf(':') + 1), 10);
                        fin = parseInt(fin.substring(0, fin.indexOf(':')), 10);
                        if (milCheck2 && fin != 12) {
                            fin += 12;
                        }
                        if (dec2 !== 0) {
                            dec2 = (dec2 / 60);
                            fin += dec2;
                        }

                        //numbers are now in perfect setting for start and end reqs
                        //will need to add multiple classes to one day
                        switch (currDay) {
                            case 'monday':
                                let monday = { name: course[0], start: beg, end: fin };
                                week.mon.push(monday);
                                console.log("week.mon", week.mon);

                                return;
                            case 'tuesday':
                                let tuesday = { name: course[0], start: beg, end: fin };
                                week.tue.push(tuesday);
                                console.log("week.tue", week.tue);

                                return;
                            case 'wednesday':
                                let wednesday = { name: course[0], start: beg, end: fin };
                                week.wed.push(wednesday);
                                console.log("week.wed", week.wed);


                                return;
                            case 'thursday':
                                let thursday = { name: course[0], start: beg, end: fin };
                                week.thur.push(thursday);
                                console.log("week.thur", week.thur);

                                return;
                            case 'friday':
                                let friday = { name: course[0], start: beg, end: fin };
                                week.fri.push(friday);
                                console.log("week.fri", week.fri);

                                return;
                        }
                    })

                }
            })
        }

        console.log(week);
        for (const day of Object.entries(week)) {
            console.log(day);
            ret.push(
                <DayArea day={day[0]} blocks={day[1]} />
            )
        }
        return ret;
    }

    render() {

        return (
            <CardDeck style={{ margin: '3px' }} >
                {this.delegateDays()}
            </CardDeck>

        )
    }
}

export default PlanArea;
