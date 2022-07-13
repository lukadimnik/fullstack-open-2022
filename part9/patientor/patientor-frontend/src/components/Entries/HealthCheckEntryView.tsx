import { HealthCheckEntry, HealthCheckRating } from '../../types';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import FavoriteIcon from '@mui/icons-material/Favorite';

interface HealthCheckEntryProps {
    healthCheckEntry: HealthCheckEntry
}

const renderHealthCheckRating = (rating: HealthCheckRating): ReactJSXElement => {
    const ratings = {
        0: <FavoriteIcon color='primary' />,
        1: <FavoriteIcon color='secondary' />,
        2: <FavoriteIcon color='warning' />,
        3: <FavoriteIcon color='error' />
    };
    return ratings[rating];
};

const HealthCheckEntryView: React.FC<HealthCheckEntryProps> = ({ healthCheckEntry }) => {
    return (
        <div className='entry-view'>
            <h3>{healthCheckEntry.date} <MonitorHeartIcon /></h3>
            <p>{healthCheckEntry.description}</p>
            <p>Diagnose by: {healthCheckEntry.specialist}</p>
            <p>{renderHealthCheckRating(healthCheckEntry.healthCheckRating)}</p>
        </div>
    );
};

export default HealthCheckEntryView;