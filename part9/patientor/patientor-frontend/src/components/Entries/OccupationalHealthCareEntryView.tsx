import { OccupationalHealthcareEntry } from '../../types';
import WorkIcon from '@mui/icons-material/Work';

interface OccupationalHealthCareEntryProps {
    occupationalHealthCareEntry: OccupationalHealthcareEntry
}

const renderSickLeave = ({ startDate, endDate }: { startDate: string, endDate: string }) => {
    return (<>
        <h4>Sick leave:</h4>
        <p>Start date: {startDate}</p>
        <p>End date: {endDate}</p>
    </>);
};

const OccupationalHealthCareEntryView: React.FC<OccupationalHealthCareEntryProps> = ({ occupationalHealthCareEntry }) => {
    return (
        <div className='entry-view'>
            <h3>{occupationalHealthCareEntry.date} <WorkIcon />  {occupationalHealthCareEntry.employerName}</h3>
            <p>{occupationalHealthCareEntry.description}</p>
            <p>Diagnose by: {occupationalHealthCareEntry.specialist}</p>
            {occupationalHealthCareEntry?.sickLeave && renderSickLeave(occupationalHealthCareEntry.sickLeave)}
        </div>
    );
};

export default OccupationalHealthCareEntryView;