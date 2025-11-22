import Navbar from '../../components/NavbarVertical/Navbar';
import Greeting from '../../components/ui/Greeting/Greetings';
import Seperator from '../../components/ui/Seperator/Seperator';

import CalorieIntake from '../../components/CalorieIntake/CalorieIntake';
import WaterCard from '../../components/WaterCard/WaterCard';
import WorkoutCard from '../../components/WorkoutCard/WorkoutCard';
import ConnectionStatus from "../../components/ConnectionStatus/ConnectionStatus";

import StandingStats from '../../components/StandingStatsCard/StandingStatsCard';
import FriendsActivity from '../../components/FriendsActivity/FriendsActivity';
import WorkoutStatsCard from '../../components/WorkoutStatsCard/WorkoutStatsCard';

export default function Home() {
    return (
        <>
            <Navbar />
            <div style={{ marginLeft: '350px', padding: '20px', overflowY: 'hidden' }}>
                <Greeting name='Washington ' />
                <div style={{ width: '50%' }}>
                    <Seperator variant="accent" />
                </div>
                <h2 style={{ color: 'white', marginTop: '20px' }}>Today's stats</h2>
                <div style={{ display: 'flex', columnGap: '20px', marginBottom: '20px', width: '80%' }}>
                    <ConnectionStatus />
                </div>

                <div style={{ display: 'flex', columnGap: '20px', marginBottom: '20px', width: '80%' }}>
                    <CalorieIntake current={1331} goal={2500} />
                    <WaterCard current={1.5} goal={3} />
                    <WorkoutStatsCard calories={1560} />

                </div>
                <div style={{ display: 'flex', columnGap: '20px', marginBottom: '20px', width: '80%' }}>

                    <WorkoutCard data={[
                        { day: 'Mon', minutes: 30 },
                        { day: 'Tue', minutes: 45 },
                        { day: 'Wed', minutes: 20 },
                        { day: 'Thu', minutes: 60 },
                        { day: 'Fri', minutes: 50 },
                        { day: 'Sat', minutes: 40 },
                        { day: 'Sun', minutes: 70 },
                    ]} />
                    {/*
                    <FriendsActivity activities={[
                        {
                        id: 1,
                        username: 'washington',
                        action: 'added a new activity',
                        timeAgo: '10m ago',
                        },
                        {
                        id: 2,
                        username: 'gmail',
                        action: 'reached the goal',
                        timeAgo: '17m ago',
                        },

                    ]}/>
                    */}

                    <StandingStats data={[
                        { day: 'Mon', minutes: 0 },
                        { day: 'Tue', minutes: 0 },
                        { day: 'Wed', minutes: 0 },
                        { day: 'Thu', minutes: 0 },
                        { day: 'Fri', minutes: 0 },
                        { day: 'Sat', minutes: 0 },
                        { day: 'Sun', minutes: 0 },
                    ]} />
                </div>



            </div>
        </>
    );
};
