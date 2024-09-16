function Github() {
    const [repos, setRepos] = React.useState([]);
    const [searchTerm, setSearchTerm] = React.useState("");

    const searchRepos = () => {
        if (searchTerm.trim() === "") {
            alert("Please enter a search term.");
            return;
        }
        fetch(`https://api.github.com/search/repositories?q=${searchTerm}`)
            .then(response => {
                if (!response.ok) throw new Error("Error in fetch: " + response.statusText);
                return response.json();
            })
            .then(data => {
                setRepos(data.items);
            })
            .catch(err => console.error("Fetch error", err));
    };

    return (
        <div className="container">
            <h1>GitHub Repository Explorer</h1>
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Enter repository name"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button className="search-btn" onClick={searchRepos}>Search</button>
            </div>
            <ul className="repo-list">
                {repos.map((repo) => (
                    <li key={repo.id} className="repo-item">
                        <div className="repo-name">{repo.full_name}</div>
                        <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="repo-url">
                            {repo.html_url}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
}

// Create root and render app
const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(<Github />);
