export class Course {
  #id;
  #title;
  #timespan;

  constructor(id, title, timespan) {
    this.#id = id;
    this.#title = title;
    this.#timespan = timespan;

    this.getID = () => this.#id;
    this.getTitle = () => this.#title;
    this.getTimespan = () => this.#timespan;
  }
}

export function GetSampleCourseList()
{
  return [
    {
      course: new Course(
        'HE7LE8', 
        'CS320, Jaime Dávila',
        'Tu, Th 13:00 - 14:15')
    },
    {
      course: new Course(
        '8h7K4j', 
        'CS311, Ghazaleh Parvini', 
        'Mo, We, Fr 11:30 - 12:45')
    },
    {
      course: new Course(
        '2s6R1q', 
        'CS576, Evangelos Kalogerakis', 
        'Mo, We, Fr 5:15 - 6:30')
    },
    {
      course: new Course(
        '5d8F2w',
        'CS345, Jaime Dávila',
        'Tu, Th 15:00 - 16:15')
    },
    {
      course: new Course(
        '9t4Y7x',
        'CS220, Marius Minea',
        'Tu, Th 9:00 - 10:15')
    },
    {
      course: new Course(
        '7Q2r9P',
        'CS377, Prashant Shenoy',
        'Fr 9:00 - 10:15')
    },
    
  ];
}
