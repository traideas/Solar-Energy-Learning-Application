from rest_framework import permissions



class IsUser(permissions.BasePermission):
    """
    Custom permission to only allow owners of an object to edit it.
    """

    def has_object_permission(self, request, view, obj):
        return obj == request.user



#
# class IsSuperAdmin(permissions.BasePermission):
#     def has_object_permission(self, request, view, obj):
#         return (request.user.is_superuser == True)




class AccessPermission(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return (request.user.is_admin or request.user.is_teacher)


class AdminPermission(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return (request.user.is_admin)



class UniversalPermission(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return




class IsCreatedBy(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        # Read permissions are allowed to any request,
        # so we'll always allow GET, HEAD or OPTIONS requests.
        if request.method in permissions.SAFE_METHODS:
            # print(type(obj.creator))
            # print(type(request.user.username))
            # print(obj.creator == request.user)
            return (obj.created_by == request.user or request.user.is_admin)
#
        # Write permissions are only allowed to the owner of the snippet.
        return (obj.created_by == request.user or request.user.is_admin)



class IsUser(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        # Read permissions are allowed to any request,
        # so we'll always allow GET, HEAD or OPTIONS requests.
        # if request.method in permissions.SAFE_METHODS:
            # print(type(obj.creator))
            # print(type(request.user.username))
            # print(obj.creator == request.user)
        print(request.user)
        if request.user.is_admin:
            return (request.user.is_admin == True)

        else:
            return (obj.created_by == request.user)
#
# #
#         # Write permissions are only allowed to the owner of the snippet.
#         return (obj.created_by == request.user)
#         return