import Navbar from '../../components/NavbarVertical/Navbar';
import Greeting from '../../components/ui/Greeting/Greetings';
import Seperator from '../../components/ui/Seperator/Seperator';

import CalorieIntake from '../../components/CalorieIntake/CalorieIntake';
import WaterCard from '../../components/WaterCard/WaterCard';
import WorkoutCard from '../../components/WorkoutCard/WorkoutCard';

import StandingStats from '../../components/StandingStatsCard/StandingStatsCard';
import FriendsActivity from '../../components/FriendsActivity/FriendsActivity';
import WorkoutStatsCard from '../../components/WorkoutStatsCard/WorkoutStatsCard';

export default function Home() {
    return (
        <>
            <Navbar />
            <div style={{ marginLeft: '350px', padding: '20px' }}>
                <Greeting name='Washington '/>
                <div style={{ width: '50%' }}>
                    <Seperator variant="accent"/>
                </div>
                <h2 style={{ color: 'white', marginTop: '20px' }}>Today's stats</h2>

                    <CalorieIntake current={1331} goal={2500} />
                    <WaterCard current={1.5} goal={3} />

                <WorkoutStatsCard calories={1560} />
                <StandingStats data={[
                    { day: 'Mon', minutes: 120 },
                    { day: 'Tue', minutes: 150 },
                    { day: 'Wed', minutes: 90 },
                    { day: 'Thu', minutes: 180 },
                    { day: 'Fri', minutes: 160 },
                    { day: 'Sat', minutes: 1040 },
                    { day: 'Sun', minutes: 200 },
                ]} />
                    
                    <WorkoutCard data={[
                        { day: 'Mon', minutes: 30 },
                        { day: 'Tue', minutes: 45 },
                        { day: 'Wed', minutes: 20 },
                        { day: 'Thu', minutes: 60 },
                        { day: 'Fri', minutes: 50 },
                        { day: 'Sat', minutes: 40 },
                        { day: 'Sun', minutes: 70 },
                    ]} />
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


            </div>
        </>
    );
};
