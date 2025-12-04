import { useState, useEffect } from 'react';
import style from './DeskSettings.module.css';

interface DeskSettingsProps {
    onHeightChange?: (height: number) => void;
    onModeChange?: (isStanding: boolean) => void;
}

const DESK_ID = 'cd:fb:1a:53:fb:e6';
const API_BASE_URL = 'http://localhost:5000/api/desks';

const DeskSettings: React.FC<DeskSettingsProps> = ({ onHeightChange, onModeChange }) => {
    const [sittingHeight, setSittingHeight] = useState<number>(100);
    const [standingHeight, setStandingHeight] = useState<number>(120);
    const [isStanding, setIsStanding] = useState<boolean>(false);

    const [currentHeight, setCurrentHeight] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const position = isStanding ? 'Standing' : 'Sitting';

    // Fetch current desk height on mount
    useEffect(() => {
        const fetchDeskHeight = async () => {
            try {
                setIsLoading(true);
                setError(null);

                const response = await fetch(`${API_BASE_URL}/${DESK_ID}`);
                if (!response.ok) {
                    throw new Error(`Failed to load desk: ${response.statusText}`);
                }

                const data: { id: string; height: number } = await response.json();

                setCurrentHeight(data.height);
                // Initialize both heights with the current height from backend
                setSittingHeight(data.height);
                setStandingHeight(data.height);
                // Also notify parent to initialize the slider with the DB height
                if (onHeightChange) {
                    onHeightChange(data.height);
                }
            } catch (err: any) {
                setError(err.message || 'Failed to load desk height');
            } finally {
                setIsLoading(false);
            }
        };

        fetchDeskHeight();
    }, []);

    const handleToggleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const standing = e.target.checked;
        setIsStanding(standing);
        if (onModeChange) {
            onModeChange(standing);
        }
    };

    const handleConfirm = async () => {
        const selectedHeight = isStanding ? standingHeight : sittingHeight;
        try {
            setIsLoading(true);
            setError(null);
            setSuccessMessage(null);

            const response = await fetch(`${API_BASE_URL}/${DESK_ID}/height`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ height: selectedHeight }),
            });

            if (!response.ok) {
                throw new Error(`Failed to update height: ${response.statusText}`);
            }

            setCurrentHeight(selectedHeight);
            setSuccessMessage(`Height updated to ${selectedHeight} cm`);
            if (onHeightChange) {
                onHeightChange(selectedHeight);
            }
        } catch (err: any) {
            setError(err.message || 'Failed to update desk height');
        } finally {
            setIsLoading(false);
        }
    };

    const addOneSitting = () => {
        setSittingHeight(prev => prev + 1);
    };

    const subtractOneSitting = () => {
        setSittingHeight(prev => prev - 1);
    };

    const addOneStanding = () => {
        setStandingHeight(prev => prev + 1);
    };

    const subtractOneStanding = () => {
        setStandingHeight(prev => prev - 1);
    };

    return (
        <div className={style.DeskSettingsContainer}>
            <div className={style.TitleContainer}>
                <p className={style.Title}>Desk Settings</p>
                <div>
                    <input
                        type="checkbox"
                        id="switch1"
                        name="switch1"
                        className={style.switch}
                        checked={isStanding}
                        onChange={handleToggleChange}
                    />
                    <label htmlFor="switch1">{position}</label>
                </div>
            </div>

            {/* Status area */}
            {isLoading && <p className={style.SettingsText}>Loading...</p>}
            {currentHeight !== null && !isLoading && (
                <p className={style.SettingsText}>Current desk height: {currentHeight} cm</p>
            )}
            {error && <p className={style.SettingsText} style={{ color: 'red' }}>{error}</p>}
            {successMessage && (
                <p className={style.SettingsText} style={{ color: 'green' }}>
                    {successMessage}
                </p>
            )}

            <p className={style.SettingsText}>Save Current Height As Preferred</p>
            <button
                className={style.SaveButton}
                onClick={handleConfirm}
                disabled={isLoading}
            >
                {isLoading ? 'Saving...' : 'confirm'}
            </button>

            <p className={style.SettingsText}>Preferred Sitting Height (cm) - Manual</p>
            <div className={style.valueAndChangeButtonsGrid}>
                <label className={style.Label}>{sittingHeight}</label>
                <button className={style.PlusButton} onClick={addOneSitting} disabled={isLoading}>
                    +
                </button>
                <button className={style.MinusButton} onClick={subtractOneSitting} disabled={isLoading}>
                    -
                </button>
            </div>

            <p className={style.SettingsText}>Preferred Standing Height (cm) - Manual</p>
            <div className={style.valueAndChangeButtonsGrid}>
                <label className={style.Label}>{standingHeight}</label>
                <button className={style.PlusButton} onClick={addOneStanding} disabled={isLoading}>
                    +
                </button>
                <button className={style.MinusButton} onClick={subtractOneStanding} disabled={isLoading}>
                    -
                </button>
            </div>
        </div>
    );
};

export default DeskSettings;
