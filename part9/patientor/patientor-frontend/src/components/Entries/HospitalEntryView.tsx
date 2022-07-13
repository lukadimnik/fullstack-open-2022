import { HospitalEntry } from '../../types';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

interface HospitalEntryProps {
    hospitalEntry: HospitalEntry;
}

const HospitalEntryView: React.FC<HospitalEntryProps> = ({ hospitalEntry }) => {
    return (
        <div className='entry-view'>
            <h3>{hospitalEntry.date} <LocalHospitalIcon /></h3>
            <p>{hospitalEntry.description}</p>
            <p>Diagnose by: {hospitalEntry.specialist}</p>
            <p>Discharge time: {hospitalEntry.discharge.date}</p>
            <p>Discharge criteria: {hospitalEntry.discharge.criteria}</p>
        </div>
    );
};

export default HospitalEntryView;