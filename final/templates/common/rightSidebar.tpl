 {include file='../../templates/forum/addTopic-form.tpl'}
<div class="template">
<table><tbody>
	<tr>
		<td>
        	<p class="template_name">SAMPLENAME</p>
        </td>
        <td class="align-right">
        	<a class="btn icon-link btn-danger btn-sm link_removeUser" data-username="" >
				<i class="fa fa-trash"></i>
            </a>
        </td>
	</tr>
</tbody></table>
</div>

<div id="sidebar-right" class="col-sm-2 padding-0 dockable minimized color-grey">
    <div class="right-sidebar-btn">
        <i class="fa fa-chevron-left hide-actor" data-target="sidebar-right" style="cursor : pointer"></i>
    </div>
    <ul class="nav nav-tabs">
      <li class="nav-item ">
        <a class="nav-link color-blue" data-toggle="collapse" data-target="#project-users">Users</a>
      </li>
	{if $isManager}
      <li class="nav-item">
        <a class="nav-link text-white my_clickable" data-toggle="collapse" data-target="#project-adding-users">Add User</a>
      </li>
	{/if}
    </ul>
    <div id="project-users" class="collapse in">
      <table  class="table table-condensed table-style ">

        {foreach from=$collaborators item=collaborator}
          <tr>
            <td>
              <p>{$collaborator.name}</p>
            </td>
            <td class="align-right">

	        {if $isManager && $managerName != $collaborator.name}
              <a class="btn icon-link btn-danger btn-sm link_removeUser" data-username="{$collaborator.name}" >
                <i class="fa fa-trash"></i>
              </a>
        	{/if}
                
            </td>
          </tr>
        {/foreach}

      </table>
    </div>
    <div id="project-adding-users" class="collapse">
      <div class="input-group form-group">
        <span class="input-group-addon my_clickable" ><i class="glyphicon glyphicon-plus"></i></span>
        <input id="form-addUser" class="form-control" type="text" placeholder="Username" tabindex = "1" name="username" value="" required="" >
      </div>
    </div>
    <ul class="nav nav-tabs">
      <li class="nav-item ">
        <a class="nav-link color-blue" data-toggle="collapse" data-target="#project-forum">Forum</a>
      </li>
      <li class="nav-item">
        <a class="nav-link text-white my_clickable" data-toggle = "modal" data-target = "#addTopic">Add Topic</a>
      </li>
    </ul>
    <div id="project-forum" class="collapse in">
      <table  class="table table-condensed table-style ">
{foreach from=$forums item=forum}
    {if !isset($forum.task_id)}
        <tr>
          <td>
            <button class="btn btn-primary forum_button" data-toggle="modal" data-target="#forum_{$forum.id}">{$forum.name}</button>
          </td>
	{if $isManager}
          <td class="align-right">
            <a class="btn icon-link btn-danger btn-sm delete_topic_button">
              <i class="fa fa-trash"></i>
            </a>
          </td>
	{/if}
        </tr>
    {/if}
{/foreach}
      </table>
    </div>
</div>
 {include file='forum/forum.tpl'}
