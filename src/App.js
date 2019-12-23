import React from 'react';
import './App.css';
import Sidebar from './Sidebar';
import CourseArea from './CourseArea';
import CartArea from './CartArea';
import PlanBar from './PlanBar';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import PlanArea from './PlanArea';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allCourses: {},     //all courses grabbed from json
      filteredCourses: {},    //filtered courses that abide by search
      subjects: [],       //list of subjects
      addedCourses: {},     //list of courses added to cart with associated data
      plannedCourses: {},   //list of courses taken from cart that user would like to create schedules with
      coursePlans: {},       //list of created schedules, that dayplanner will display
      schedOptions: [],
      navigatedPlan: [],
      index: 0
    };
    this.setCartCourses = this.setCartCourses.bind(this);
    this.setPlannedCourses = this.setPlannedCourses.bind(this);
    this.configureSchedulePlans = this.configureSchedulePlans.bind(this);
    this.navigateSchedulePlans = this.navigateSchedulePlans.bind(this);
  }

  componentDidMount() {
    fetch('https://mysqlcs639.cs.wisc.edu/classes/').then(
      res => res.json()
    ).then(data => this.setState({ allCourses: data, filteredCourses: data, subjects: this.getSubjects(data) }));


  }

  getSubjects(data) {
    let subjects = [];
    subjects.push("All");

    for (const course of Object.values(data)) {
      if (subjects.indexOf(course.subject) === -1)
        subjects.push(course.subject);
    }

    return subjects;
  }

  setCourses(courses) {
    this.setState({ filteredCourses: courses })
  }

  setCartCourses(addCourse, courseData, operation) {

    if (operation === 1) {
      this.setState(this.state.addedCourses[addCourse] = courseData);
    } else {
      delete this.state.addedCourses[addCourse];
    }
    console.log(this.state.addedCourses);
  }

  setPlannedCourses(course, data) {
    this.setState(this.state.plannedCourses[course] = data);
    console.log(this.state.plannedCourses);
  }

  configureSchedulePlans() {
    if (this.state.plannedCourses !== undefined) {
      console.log(this.state.plannedCourses);

      let courseTimeBlocks;
      let timeBlocks = [];

      Object.entries(this.state.plannedCourses).forEach(course => {
        courseTimeBlocks = [];
        console.log(course);
        //for each section
        Object.entries(course[1]).forEach(section => {
          if (section[1].length !== undefined) {
            return;
          }
          console.log(section);
          //if there are no subsections....push
          //its a subsection from the beginning
          if (section[1].subsections !== undefined) {
            if (Object.entries(section[1].subsections).length === 0) {
              courseTimeBlocks.push([course[0], section]);
            } else {
              Object.entries(section[1].subsections).forEach(subSection => {
                courseTimeBlocks.push([course[0], section, subSection]);
              })
            }
          } else {
            courseTimeBlocks.push([course[0], section]);
          }

        })
        timeBlocks.push(courseTimeBlocks);
      })
      console.log(timeBlocks);

      //Now, timeBlocks contains a list for each course in which one of the section-subsection 
      //pairs must be selected to schedule. Iterate through all of these possibilities and 
      //add to schedules if there are no conflicts

      //for each class
      //check section time. if it works 
      //check subsection time
      //if it works, push course, section and subsection
      let tempSchedule;
      let classCount = 1;
      let schedPoss = {};
      let baseCourse = timeBlocks.pop();
      let schedIndex = 0;
      Object.entries(baseCourse).forEach(base => {
        tempSchedule = [];
        tempSchedule.push(base[1]);
        classCount = 1;


        Object.entries(timeBlocks).forEach(coursePackage => {
          //coursePackage contains every possible combination of a given course's:  sections and subsections
          classCount++;

          // console.log(coursePackage);
          try {
            Object.values(coursePackage[1]).forEach(section => {

              console.log(section);
              //format:
              //section[1] = section
              //section[2] = subsection
              //if section works
              let check = schedConflicts(tempSchedule, section[1]);
              if (!schedConflicts(tempSchedule, section[1])) {
                //check subsections
                if (section.length !== 3) {

                  tempSchedule.push(section);
                  console.log("Temp schedule");
                  console.log(tempSchedule);
                  throw 'move to new course';
                } else {
                  check = schedConflicts(tempSchedule, section[2]);

                  if (!schedConflicts(tempSchedule, section[2])) {
                    console.log(section);
                    tempSchedule.push(section);
                    console.log("Temp schedule");
                    console.log(tempSchedule);
                    throw 'move to new course';
                  }
                }
              }

            })
          } catch (error) {
            //carry on. This means a class or section has already been added
          }

        })

        if (tempSchedule.length === classCount) {
          schedPoss[schedIndex] = tempSchedule;
          console.log(schedPoss);
          schedIndex++;
        }


      })

      console.log("Annnd here we are captain.");
      if (schedPoss.length === 0) {
        //base case: unlikely, but error checking
        //do not set state
      } else {
        let transition = [...this.state.schedOptions];
        transition.push(schedPoss);
        this.setState({ schedOptions: [...this.state.schedOptions, schedPoss] });

        console.log(schedPoss);
        console.log(this.state.schedOptions);
        // return schedPoss;
      }



      function schedConflicts(schedule, newTimeBlock) {
        let ret;

        // console.log(schedule);
        //compare newTimeBlock to every class thats already in the schedule
        Object.values(schedule).forEach(soundCourse => {
          //check conflicts of section or subsections
          if (!classConflicts(soundCourse[1], newTimeBlock)) {

            console.log(soundCourse[2]);

            if (soundCourse[2] !== undefined) {

              if (!classConflicts(soundCourse[2], newTimeBlock)) {
                if (ret !== 'true') {
                  ret = false;
                  return ret;
                } else {
                  return ret;
                }
              } else {
                ret = true;
                return true;
              }
            }
          } else {
            ret = true;
            return ret;
          }
        })
        return ret;

      }

      function classConflicts(soundCourse, testCourse) {
        let ret = false;
        Object.entries(soundCourse[1].time).forEach(sound => {
          Object.entries(testCourse[1].time).forEach(test => {
            //sound, test);
            if (sound[0] === test[0]) {
              let soundBlock = sound[1];


              let soundStart = soundBlock.substr(0, soundBlock.indexOf(' ') - 2);
              let soundFin = soundBlock.substr(soundBlock.indexOf('-') + 2, soundBlock.length);
              soundFin = soundFin.substr(0, soundFin.length - 2);

              //now in format of xx:xxzm
              //convert to military and decimal
              let dec1 = parseInt(soundStart.substr(soundStart.indexOf(':') + 1), 10);
              soundStart = parseInt(soundStart.substring(0, soundStart.indexOf(':')), 10);
              let milCheck = soundBlock.substr(0, soundBlock.indexOf(' '));

              if (milCheck.includes("pm") && (soundStart !== 12)) {
                soundStart += 12;
              }
              if (dec1 !== 0) {
                dec1 = (dec1 / 60);
                soundStart += dec1;
              }

              milCheck = soundBlock.substr(soundBlock.indexOf('-') + 2, soundBlock.length);
              let dec2 = parseInt(soundFin.substr(soundFin.indexOf(':') + 1), 10);
              soundFin = parseInt(soundFin.substring(0, soundFin.indexOf(':')), 10);

              if (milCheck.includes("pm") && (soundFin !== 12)) {
                soundFin += 12;
              }
              if (dec2 !== 0) {
                dec2 = (dec2 / 60);
                soundFin += dec2;
              }

              let testBlock = test[1];
              let testStart = testBlock.substr(0, testBlock.indexOf(' ') - 2);
              let testFin = testBlock.substr(testBlock.indexOf('-') + 2, testBlock.length);
              testFin = testFin.substr(0, testFin.length - 2);


              //now in format of xx:xxzm
              //convert to military and decimal
              dec1 = parseInt(testStart.substr(testStart.indexOf(':') + 1), 10);
              testStart = parseInt(testStart.substring(0, testStart.indexOf(':')), 10);
              milCheck = testBlock.substr(0, testBlock.indexOf(' '));

              if (milCheck.includes("pm") && (testStart !== 12)) {
                testStart += 12;
              }
              if (dec1 !== 0) {
                dec1 = (dec1 / 60);
                testStart += dec1;
              }

              milCheck = testBlock.substr(testBlock.indexOf('-') + 2, testBlock.length);
              dec2 = parseInt(testFin.substr(testFin.indexOf(':') + 1), 10);
              testFin = parseInt(testFin.substring(0, testFin.indexOf(':')), 10);

              if (milCheck.includes("pm") && (testFin !== 12)) {
                testFin += 12;
              }
              if (dec2 !== 0) {
                dec2 = (dec2 / 60);
                testFin += dec2;
              }
              //viola! bingo bango bongo
              //now we have start and finish times of both days
              // console.log(soundStart, soundFin, testStart, testFin);
              //if class 1 starts then class 2 starts... or if class 2 starts and then class 1 starts
              if (((soundStart <= testStart) && (soundFin >= testStart)) || ((testStart <= soundStart) && (testFin >= soundStart))) {
                ret = true;
              }


            }
          })
        })


        return ret;
      }

    }

  }

  navigateSchedulePlans(direction) {
    let temp = this.state.index;
    if (direction === -1) {
      if (temp === 0) {
        temp = this.state.schedOptions.length;
      } else {
        temp = temp - 1;
      }
      this.setState(this.state.index = temp);

    } else {
      if (temp === this.state.schedOptions.length) {
        temp = 0;
      } else {
        temp = temp + 1;
      }
      this.setState(this.state.index = temp);
    }
  }



  render() {

    const tabDisplay = (
      <Tabs defaultIndex={0}>
        <TabList>
          <Tab>Search Courses</Tab>
          <Tab>Cart</Tab>
          <Tab>Planner</Tab>
        </TabList>
        <TabPanel>
          <Sidebar setCourses={(courses) => this.setCourses(courses)} courses={this.state.allCourses} subjects={this.state.subjects} />
          <div style={{ marginLeft: '20vw' }}>
            <CourseArea data={this.state.filteredCourses} setCartCourses={(course, courseData, operation) => this.setCartCourses(course, courseData, operation)} />
          </div>
        </TabPanel>
        <TabPanel>
          <div>
            <CartArea data={this.state.addedCourses} setCartCourses={(course, sections, subsections, timeblock, operation) => this.setCartCourses(course, sections, subsections, timeblock, operation)} />
          </div>
        </TabPanel>
        <TabPanel style={{ display: 'flex' }}>
          <PlanBar trigger={this.configureSchedulePlans} schedOptions={this.state.schedOptions} planableCourses={this.state.addedCourses} setPlannedCourses={(course, courseData) => this.setPlannedCourses(course, courseData)} navTrig={(direction) => this.navigateSchedulePlans(direction)} index={this.state.index} />
          <div style={{ flex: '1' }}>
            <PlanArea style={{ flexDirection: 'row', flex: 1 }} coursePlans={this.state.schedOptions} />
          </div>
        </TabPanel>
      </Tabs>
    );

    return (
      <>
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
          integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
          crossOrigin="anonymous"
        />
        <div>
          {tabDisplay}
        </div>
      </>
    )
  }
}

export default App;

