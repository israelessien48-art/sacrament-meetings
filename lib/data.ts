
import type { SacramentMeeting } from "./types";

export const meetings: SacramentMeeting[] = [
  {
    id: 1,
    date: "2026-11-08",
    time: "10:00 AM",
    type: "sacrament",
    presiding: "Bishop John Smith",
    conducting: "Brother David Brown",
    openingHymn: { title: "The Morning Breaks", number: 1 },
    sacramentHymn: { title: "In Humility, Our Savior", number: 172 },
    closingHymn: { title: "Come, Follow Me", number: 116 },
    speakers: [
      { name: "Sister Mary Johnson", topic: "Faith in Jesus Christ", order: 1 },
      { name: "Brother Peter James", topic: "Serving One Another", order: 2 },
    ],
    wardBusiness: [
      { title: "Ward Activity", description: "Saturday at 4:00 PM" },
    ],
    announcements: ["Please welcome our visitors."],
    isCurrent: true,
  },
  {
    id: 2,
    date: "2026-11-01",
    time: "10:00 AM",
    type: "sacrament",
    presiding: "Bishop John Smith",
    conducting: "Brother David Brown",
    openingHymn: { title: "High on the Mountain Top", number: 5 },
    sacramentHymn: { title: "How Great the Wisdom and the Love", number: 195 },
    closingHymn: { title: "I Need Thee Every Hour", number: 98 },
    speakers: [
      { name: "Brother Samuel Lee", topic: "Gratitude", order: 1 },
      { name: "Sister Grace Adams", topic: "Following the Savior", order: 2 },
    ],
    wardBusiness: [],
    announcements: ["Thank you for attending today's meeting."],
    isCurrent: false,
  },
  {
    id: 3,
    date: "2026-10-25",
    time: "10:00 AM",
    type: "sacrament",
    presiding: "Bishop John Smith",
    conducting: "Sister Ruth Clark",
    openingHymn: { title: "The Spirit of God", number: 2 },
    sacramentHymn: { title: "Jesus, Once of Humble Birth", number: 196 },
    closingHymn: { title: "Let Us All Press On", number: 243 },
    speakers: [
      { name: "Brother Michael Davis", topic: "Prayer", order: 1 },
      { name: "Sister Anna Wilson", topic: "The Book of Mormon", order: 2 },
    ],
    wardBusiness: [],
    announcements: ["Youth activity will take place this Friday."],
    isCurrent: false,
  },
  {
    id: 4,
    date: "2026-10-18",
    time: "10:00 AM",
    type: "ward-conference",
    presiding: "Bishop John Smith",
    conducting: "Brother David Brown",
    openingHymn: { title: "Come, Ye Children of the Lord", number: 58 },
    sacramentHymn: { title: "There Is a Green Hill Far Away", number: 194 },
    closingHymn: { title: "We Thank Thee, O God, for a Prophet", number: 19 },
    speakers: [
      { name: "Stake President James", topic: "Building Faith", order: 1 },
      { name: "Bishop John Smith", topic: "Ward Unity", order: 2 },
    ],
    wardBusiness: [
      { title: "Stake Conference", description: "Please check the ward notice board." },
    ],
    announcements: ["Welcome to Ward Conference."],
    isCurrent: false,
  },
  {
    id: 5,
    date: "2026-10-11",
    time: "10:00 AM",
    type: "sacrament",
    presiding: "Bishop John Smith",
    conducting: "Brother David Brown",
    openingHymn: { title: "I Believe in Christ", number: 134 },
    sacramentHymn: { title: "While of These Emblems We Partake", number: 173 },
    closingHymn: { title: "God Be with You Till We Meet Again", number: 152 },
    speakers: [
      { name: "Sister Elizabeth King", topic: "The Power of the Holy Ghost", order: 1 },
      { name: "Brother Daniel White", topic: "Keeping Our Covenants", order: 2 },
    ],
    wardBusiness: [],
    announcements: ["Have a peaceful week."],
    isCurrent: false,
  },
];

export function getAllMeetings(): SacramentMeeting[] {
  return meetings;
}

export function getMeetingById(id: number): SacramentMeeting | undefined {
  return meetings.find((meeting) => meeting.id === id);
}

export function getCurrentMeeting(): SacramentMeeting | undefined {
  return meetings.find((meeting) => meeting.isCurrent);
}

export function getMeetingsByDate(date: string): SacramentMeeting[] {
  return meetings.filter((meeting) => meeting.date === date);
}
