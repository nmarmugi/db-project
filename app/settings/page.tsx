import { getUserProfiles } from "../actions";

export default async function SettingsPage() {
    const user = await getUserProfiles();
    return (
        <div>
           Level {user.level}
        </div>
    );
}
