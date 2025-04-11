'use client';

import { useState } from 'react';
import Link from 'next/link';

// Mock study schedule data - this would ideally be generated from the user's performance data
const weekdaysMock = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

// Each day has recommended study sessions
const studyScheduleMock = [
{
  day: 'Monday',
  sessions: [
  {
    id: 'mon1',
    subject: 'Math',
    topic: 'Algebra Review',
    duration: 45, // minutes
    priority: 'high',
    completed: false
  },
  {
    id: 'mon2',
    subject: 'Reading',
    topic: 'Passage Analysis',
    duration: 30,
    priority: 'medium',
    completed: false
  }]

},
{
  day: 'Tuesday',
  sessions: [
  {
    id: 'tue1',
    subject: 'Writing',
    topic: 'Grammar Rules',
    duration: 40,
    priority: 'high',
    completed: false
  },
  {
    id: 'tue2',
    subject: 'Math',
    topic: 'Word Problems',
    duration: 35,
    priority: 'medium',
    completed: false
  }]

},
{
  day: 'Wednesday',
  sessions: [
  {
    id: 'wed1',
    subject: 'Reading',
    topic: 'Inference Questions',
    duration: 45,
    priority: 'high',
    completed: false
  }]

},
{
  day: 'Thursday',
  sessions: [
  {
    id: 'thu1',
    subject: 'Math',
    topic: 'Geometry Concepts',
    duration: 45,
    priority: 'medium',
    completed: false
  },
  {
    id: 'thu2',
    subject: 'Writing',
    topic: 'Essay Structure',
    duration: 60,
    priority: 'high',
    completed: false
  }]

},
{
  day: 'Friday',
  sessions: [
  {
    id: 'fri1',
    subject: 'Reading',
    topic: 'Vocabulary in Context',
    duration: 30,
    priority: 'medium',
    completed: false
  },
  {
    id: 'fri2',
    subject: 'Math',
    topic: 'Practice Test',
    duration: 60,
    priority: 'high',
    completed: false
  }]

},
{
  day: 'Saturday',
  sessions: [
  {
    id: 'sat1',
    subject: 'All Subjects',
    topic: 'Full Practice Test',
    duration: 180,
    priority: 'high',
    completed: false
  }]

},
{
  day: 'Sunday',
  sessions: [
  {
    id: 'sun1',
    subject: 'All Subjects',
    topic: 'Review Weak Areas',
    duration: 90,
    priority: 'medium',
    completed: false
  }]

}];


export function StudySchedule() {
  // Get current day of week to highlight today
  const today = new Date().toLocaleString('en-us', { weekday: 'long' });
  const [selectedDay, setSelectedDay] = useState(today);

  // Get schedule for selected day
  const daySchedule = studyScheduleMock.find((day) => day.day === selectedDay) || studyScheduleMock[0];

  // Get subject color
  const getSubjectColor = (subject: string) => {
    switch (subject) {
      case 'Math':return 'from-blue-500 to-sky-500';
      case 'Reading':return 'from-purple-500 to-indigo-500';
      case 'Writing':return 'from-rose-500 to-pink-500';
      default:return 'from-emerald-500 to-teal-500';
    }
  };

  // Get priority badge color
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':return 'bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-300';
      case 'medium':return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300';
      default:return 'bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-300';
    }
  };

  // Format duration for display
  const formatDuration = (minutes: number) => {
    if (minutes < 60) return `${minutes} min`;
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return remainingMinutes > 0 ?
    `${hours}h ${remainingMinutes}m` :
    `${hours}h`;
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden" data-oid="7lv_u7t">
      <div className="p-5 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center" data-oid="ot7j1d2">
        <h3 className="font-medium text-slate-800 dark:text-white text-lg" data-oid="ykvd6b:">Weekly Study Schedule</h3>
        
        <Link
          href="/course/schedule"
          className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 flex items-center" data-oid="_a7b53-">

          Customize
          <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-oid="44s2yxl">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" data-oid="4wl9ep5" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" data-oid="rk2665b" />
          </svg>
        </Link>
      </div>
      
      {/* Day selector */}
      <div className="flex overflow-x-auto hide-scrollbar p-2 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/70" data-oid="_i-u89e">
        {weekdaysMock.map((day) =>
        <button
          key={day}
          onClick={() => setSelectedDay(day)}
          className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors mx-1 ${
          selectedDay === day ?
          'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-sm ring-1 ring-slate-200 dark:ring-slate-600' :
          'text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700 hover:text-indigo-600 dark:hover:text-indigo-400'} ${
          day === today ? 'ring-1 ring-indigo-200 dark:ring-indigo-800' : ''}`} data-oid="rywr8ky">

            {day}
            {day === today &&
          <span className="ml-1.5 inline-flex h-1.5 w-1.5 items-center justify-center rounded-full bg-indigo-500" data-oid="--aoois"></span>
          }
          </button>
        )}
      </div>
      
      {/* Daily schedule */}
      <div className="p-4" data-oid="2-18o0e">
        <div className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-3 flex justify-between items-center" data-oid="kp3:_j.">
          <span data-oid="opr:ncj">{selectedDay === today ? 'Today\'s Schedule' : `${selectedDay}'s Schedule`}</span>
          <span data-oid="4pvslky">{daySchedule.sessions.length} {daySchedule.sessions.length === 1 ? 'session' : 'sessions'}</span>
        </div>
        
        {daySchedule.sessions.length > 0 ?
        <div className="space-y-3" data-oid="_po6s-_">
            {daySchedule.sessions.map((session) =>
          <div
            key={session.id}
            className="p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 relative overflow-hidden group hover:border-indigo-200 dark:hover:border-indigo-800 transition-colors" data-oid="7v-217c">

                {/* Colored accent bar */}
                <div className={`absolute left-0 top-0 w-1 h-full bg-gradient-to-b ${getSubjectColor(session.subject)}`} data-oid="lj2xv6:"></div>
                
                <div className="flex justify-between items-start ml-2" data-oid=".yephcr">
                  <div data-oid="3jrlmpa">
                    <div className="flex items-center" data-oid="0c6p.-g">
                      <h4 className="font-medium text-slate-900 dark:text-white" data-oid="kmyi3cx">{session.topic}</h4>
                      <span className={`ml-2 px-2 py-0.5 text-xs rounded-full ${getPriorityColor(session.priority)}`} data-oid="1fx3jvd">
                        {session.priority === 'high' ? 'Priority' : session.priority}
                      </span>
                    </div>
                    <div className="text-sm text-slate-500 dark:text-slate-400 mt-1" data-oid="9qm8ufd">
                      {session.subject} • {formatDuration(session.duration)}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2" data-oid="6hsh3fz">
                    <button
                  className="text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity"
                  title="Mark complete" data-oid="4w.asyw">

                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-oid="ggaj9ou">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" data-oid="6q9ezlz" />
                      </svg>
                    </button>
                    <Link
                  href={`/overview/${session.subject.toLowerCase()}`}
                  className="px-2.5 py-1.5 text-xs font-medium rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-indigo-50 hover:text-indigo-600 dark:hover:bg-slate-700 dark:hover:text-indigo-400 transition-colors" data-oid="cnm7qlw">

                      Start
                    </Link>
                  </div>
                </div>
              </div>
          )}
          </div> :

        <div className="text-center py-8" data-oid="gn5.7hh">
            <div className="text-2xl mb-2" data-oid="35q79vb">🎉</div>
            <h4 className="font-medium text-slate-800 dark:text-white" data-oid="rzkt14k">No sessions planned</h4>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1" data-oid="__:2y6x">Enjoy your free time!</p>
          </div>
        }
      </div>
      
      {/* Total study time */}
      <div className="p-4 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50" data-oid="d7t953z">
        <div className="flex justify-between items-center" data-oid="b-2.7eg">
          <div className="text-sm font-medium text-slate-600 dark:text-slate-300" data-oid=":ll6vz_">
            Total study time:
          </div>
          <div className="font-medium text-slate-900 dark:text-white" data-oid="q9g5jv1">
            {formatDuration(daySchedule.sessions.reduce((total, session) => total + session.duration, 0))}
          </div>
        </div>
      </div>
    </div>);

}