import { Entry } from '../types';
import { assertNever } from '../utils';
import HealthCheckEntryView from './Entries/HealthCheckEntryView';
import HospitalEntryView from './Entries/HospitalEntryView';
import OccupationalHealthCareEntryView from './Entries/OccupationalHealthCareEntryView';
import './EntryView.css';

const EntryView: React.FC<{ entry: Entry }> = ({ entry }) => {
    switch (entry.type) {
        case 'Hospital':
            return <HospitalEntryView hospitalEntry={entry} />;
        case 'HealthCheck':
            return <HealthCheckEntryView healthCheckEntry={entry} />;
        case 'OccupationalHealthcare':
            return <OccupationalHealthCareEntryView occupationalHealthCareEntry={entry} />;
        default:
            return assertNever(entry);
    }
};

export default EntryView;