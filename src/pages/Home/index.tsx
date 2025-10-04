import MainPanel from '../../components/MainPanel/MainPanel';
import Navbar from '../../components/Navbar/Navbar';
import Features from '../../components/Features/Features';
import Subscriptions from '../../components/Subscriptions/Subscriptions';

export default function Home() {
    return (
        <>
            <Navbar />
            <MainPanel />
            <Features />
            <Subscriptions />
        </>
    );
};
