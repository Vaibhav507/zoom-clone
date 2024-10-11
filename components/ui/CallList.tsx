"use client"
import { useGetCalls } from '@/hooks/useGetCalls';
import { Call, CallRecording } from '@stream-io/video-react-sdk';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import MeetingCard from './MeetingCard';

const CallList = ({ type }: { type: 'ended' | 'upcoming' | 'recordings' }) => {

    const { endedCalls, upcomingCalls, callRecordings, isLoading } = useGetCalls();
    const router = useRouter();

    const [recordings, setRecordings] = useState<CallRecording[]>()

    const getCalls = () => {
        switch (type) {
            case 'ended':
                return endedCalls;
            case 'upcoming':
                return upcomingCalls;
            case 'recordings':
                return recordings;
            default:
                return [];
        }
    }

    const getNoCallsMessage = () => {
        switch (type) {
            case 'ended':
                return 'No Previous Calls';
            case 'upcoming':
                return 'No upcoming Calls';
            case 'recordings':
                return 'No Recordings';
            default:
                return '';
        }
    }

    const calls = getCalls();
    const noCallsMessage = getNoCallsMessage();

    return (
        <div className='grid grid-cols-1 gap-5 xl:grid-cols-2'>
            {calls && calls.length>0 
            ? calls.map((meeting: Call | CallRecording) => ( 
                <MeetingCard 
                    key={(meeting as Call).id}
                    icon='' 
                    title='' 
                    date='' 
                    isPreviousMeeting={false}
                    buttonIcon1='' 
                    handleClick={()=> {}}
                    link='' 
                    buttonText=''
                /> )) 
            : ( <h1>{noCallsMessage}</h1>)
            }
        </div>
    )
}

export default CallList