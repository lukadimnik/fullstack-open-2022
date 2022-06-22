import { CoursePart } from '../App';

interface PartProps {
    part: CoursePart;
}

const assertNever = (value: never) => {
    throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(value)}`
    )
}

const Part = ({ part }: PartProps) => {

    switch (part.type) {
        case 'normal':
            return (<>
                <h4>
                    {part.name} {part.exerciseCount}
                </h4>
                <p>{part.description}</p>
            </>)
        case 'groupProject':
            return (<>
                <h4>
                    {part.name} {part.exerciseCount}
                </h4>
                <p>Project exercises: {part.groupProjectCount}</p>
            </>)
        case 'submission':
            return (<>
                <h4>
                    {part.name} {part.exerciseCount}
                </h4>
                <p>{part.description}</p>
                <p>Submit to: {part.exerciseSubmissionLink}</p>

            </>)
        case 'special':
            return (<>
                <h4>
                    {part.name} {part.exerciseCount}
                </h4>
                <p>{part.description}</p>
                <p>Requirements: {part.requirements.map(req => req + ' ')}</p>
            </>)
        default:
            return assertNever(part)
    }
};

export default Part;