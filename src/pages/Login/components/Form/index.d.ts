type OnChange = (value?: string) => void;

export interface FormProps extends IBasicProps {
    type: number;
    onUsernameChange: OnChange;
    onPasswordChange: OnChange;
    onVerifyChange?: OnChange;
}
