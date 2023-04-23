const issueNumber = 155; // replace with the number of the issue you want to parse
    const { data: issue } = await github.issues.get({
      owner: context.repo.owner,
      repo: context.repo.repo,
      issue_number: issueNumber
    });
    console.log(issue.title);
    console.log(issue.body);