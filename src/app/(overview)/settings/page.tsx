import TabList from "./settingsTabs/TabList";

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 px-4 p-2">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-4">
          <p className="text-gray-600 dark:text-gray-400">
            Manage your AlgoMentor account and preferences
          </p>
        </div>

        {/* Settings Tabs */}
        <TabList />
      </div>
    </div>
  );
}
