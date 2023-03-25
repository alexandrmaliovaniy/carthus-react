interface I{{ARGS.NAME}}GuardProps {
    children: any
}

const {{ARGS.NAME}}Guard: FC<I{{ARGS.NAME}}GuardProps> = ({children, ...props}) => {
    return children;
};