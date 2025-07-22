use App\Models\User;

public function show($username)
{
    $user = User::where('username', $username)->firstOrFail();

    return Inertia::render('PublicProfile', [
        'user' => $user,
        'services' => $user->services,
        'workingHours' => $user->workingHours,
        'blockedTimes' => $user->blockedTimes,
    ]);
}