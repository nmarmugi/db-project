import { getUserProfiles } from "../actions";

export default function SettingsPage() {
    getUserProfiles();
    return (
        <div>
            Settings
        </div>
    );
}
