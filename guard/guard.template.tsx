interface I{{ARGS.NAME}}GuardProps {

}

const {{ARGS.NAME}}Guard: FC<I{{ARGS.NAME}}GuardProps> = ({...props}) => {
    return <Outlet />
};